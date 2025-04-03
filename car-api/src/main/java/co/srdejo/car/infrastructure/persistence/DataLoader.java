package co.srdejo.car.infrastructure.persistence;

import co.srdejo.car.infrastructure.persistence.entity.CarEntity;
import co.srdejo.car.infrastructure.persistence.entity.UserEntity;
import co.srdejo.car.infrastructure.persistence.repository.CarRepository;
import co.srdejo.car.infrastructure.persistence.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private static final Log log = LogFactory.getLog(DataLoader.class);
    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, CarRepository carRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        log.info("✅ CommandLineRunner ejecutado: cargando datos iniciales...");
        if (userRepository.count() == 0) { // Evita insertar duplicados
            UserEntity user1 = new UserEntity("user1", passwordEncoder.encode("password123"));
            UserEntity user2 = new UserEntity("user2", passwordEncoder.encode("password456"));

            userRepository.save(user1);
            userRepository.save(user2);

            carRepository.save(new CarEntity(null, "Toyota", "Corolla",   2020, "XYZ123","Red",user1));
            carRepository.save(new CarEntity(null, "Honda","Civic",2019, "ABC789", "Blue",   user2));
        }
    }
}
