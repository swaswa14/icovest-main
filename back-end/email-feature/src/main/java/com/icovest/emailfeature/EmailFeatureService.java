package com.icovest.emailfeature;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class EmailFeatureService {
    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;





    @Value("${app.config.HOST}")
    private String HOST;

    @Value("${app.config.SERVER_PORT}")
    private String SERVER_PORT;


    public void sendEmailEnableAccount(String token, String email, Date expiryDate) throws MessagingException {
        final String confirmationLink = String.format("http://%s:%s/api/v1/auth/enable?token=%s",
                HOST,
                SERVER_PORT,
                token
        );

        final String subject = "Email Confirmation";
        final String html = "enabled_account";

        Context context = new Context();
        context.setVariable("confirmationLink", confirmationLink);
        context.setVariable("expirationDate", expiryDate);

        sendEmail(email, subject, context, html);


    }

    public void sendEmail(String email, String subject, Context context, String html) throws MessagingException {
        String emailContent = templateEngine.process(html, context);
        // Set the email subject, recipient, and content
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setSubject(subject);
        helper.setTo(email);
        helper.setText(emailContent, true);

        // Send the email
        mailSender.send(message);
    }

    public void sendCodeToForgotPassword(String email, String token) throws MessagingException {
        final String link = String.format("http://%s:%s/api/v1/auth/reset?token=%s",
                HOST,
                SERVER_PORT,
                token
        );

        final String html = "forgot_password_code";

        Context context = new Context();
        context.setVariable("link", link);

        sendEmail(email, "Forgot Password", context, html);

    }

    public void sendGenericEmail(String email, String subject, String message, String title) throws MessagingException {
        final String html = "generic_email";

        Context context = new Context();
        context.setVariable("message", message);
        context.setVariable("title", title);
        context.setVariable("subject", subject);

        sendEmail(email, subject, context, html);
    }


}
