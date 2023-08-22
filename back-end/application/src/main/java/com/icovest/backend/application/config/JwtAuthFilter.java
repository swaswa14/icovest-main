package com.icovest.backend.application.config;

import com.icovest.authenticationfeature.service.JwtService;
import com.icovest.backend.userfeature.entity.User;
import com.icovest.backend.userfeature.entity.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Service
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService, UserService userService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.userService = userService;
    }

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {
        Cookie[] cookies = request.getCookies();

        if (cookies == null || Arrays.stream(cookies).noneMatch(cookie -> cookie.getName().equals("jwt"))) {
            filterChain.doFilter(request, response);
//            String redirectURL = "/login";
//            response.setHeader("Location", redirectURL);
//            response.setStatus(302);
//            response.sendRedirect(redirectURL);
        }
        else {
            for (Cookie cookie : cookies) {
                log.info("Cookie name " + cookie.getName());
                log.info("Cookie value " + cookie.getValue());
                if (cookie.getName().equals("jwt")) {
                    String jwt = cookie.getValue();
                    String username = jwtService.extractUsername(jwt);
                    log.info("username " + username);

                    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        User userDetails = this.userService.findUserByUsernameOrEmail(username);

                        if (jwtService.isTokenValid(jwt, userDetails)) {
                            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authToken);
                        }
                    }
                    filterChain.doFilter(request, response);
                }
            }
        }

    }
}

