//package com.icovest.backend.userfeature.entity;
//
//import lombok.RequiredArgsConstructor;
//import org.hibernate.HibernateException;
//import org.hibernate.MappingException;
//import org.hibernate.engine.spi.SharedSessionContractImplementor;
//import org.hibernate.id.IdentifierGenerator;
//import org.hibernate.id.enhanced.SequenceStyleGenerator;
//import org.hibernate.internal.util.config.ConfigurationHelper;
//import org.hibernate.service.ServiceRegistry;
//import org.hibernate.type.Type;
//import org.springframework.beans.BeansException;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.ApplicationContextAware;
//
//import java.io.Serializable;
//import java.time.LocalDate;
//import java.util.Optional;
//import java.util.Properties;
//import java.util.UUID;
//
//@RequiredArgsConstructor
//public class UserIdGenerator implements IdentifierGenerator, ApplicationContextAware {
//    private ApplicationContext applicationContext;
//
//    // ... (rest of your code)
//
//    @Override
//    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//        this.applicationContext = applicationContext;
//    }
//
//
//
//
//
//    @Override
//    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
//
//        UserRepository userRepository = applicationContext.getBean(UserRepository.class);
//        boolean isUnique = false;
//        String id="";
//        do {
//            id = generateID();
//            Optional<User> user = userRepository.findById(id);
//            if(user.isEmpty()){
//                isUnique = true;
//            }
//        }while (isUnique);
//        return id;
//    }
//
////    @Override
////    public void configure(Type type, Properties params, ServiceRegistry serviceRegistry) throws MappingException {
////        super.configure(type, params, serviceRegistry);
////        String yearNumberSeparator = ConfigurationHelper.getString(YEAR_NUMBER_SEPARATOR_PARAMETER, params, YEAR_NUMBER_SEPARATOR_DEFAULT);
////        String monthNumberSeparator = ConfigurationHelper.getString(MONTH_NUMBER_SEPARATOR_PARAMETER, params, MONTH_NUMBER_SEPARATOR_DEFAULT);
////
////        String numberFormat = ConfigurationHelper.getString(NUMBER_FORMAT_PARAMETER, params, NUMBER_FORMAT_DEFAULT).replace("%", "%3");
////
////        this.format = "%1$d" + yearNumberSeparator + "%02d" + monthNumberSeparator + numberFormat;
////
////    }
//
//    public String generateID(){
//        UUID uuid = UUID.randomUUID();
//
//        // Extract numbers from the UUID until we have 6 digits.
//        char[] uuidChars = uuid.toString().toCharArray();
//        StringBuilder digits = new StringBuilder();
//        for (char ch : uuidChars) {
//            if (Character.isDigit(ch)) {
//                digits.append(ch);
//                if (digits.length() == 6) {
//                    break;
//                }
//            }
//        }
//
//        // Ensure we found 6 digits, if not you might want to handle this case.
//        if (digits.length() < 6) {
//            throw new RuntimeException("Not enough digits in the UUID");
//        }
//
//        // Format the 6 digits as 000-000.
//        return digits.substring(0, 3) + "-" + digits.substring(3);
//    }
//}
