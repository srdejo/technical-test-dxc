package co.srdejo.car.application.service;

import co.srdejo.car.application.dto.UserDto;
import co.srdejo.car.domain.exception.AuthenticationException;
import co.srdejo.car.domain.service.AuthService;
import co.srdejo.car.infrastructure.persistence.entity.UserEntity;
import co.srdejo.car.infrastructure.persistence.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenServiceImpl jwtService;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenServiceImpl jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    @Override
    public String createToken(UserDto userDto) {
        UserEntity appUserEntity = userRepository.findByUsername(userDto.getUsername())
                .orElseThrow(() -> new AuthenticationException("Credenciales incorrectas"));

        if (!passwordEncoder.matches(userDto.getPassword(), appUserEntity.getPassword())) {
            throw new AuthenticationException("Credenciales incorrectas");
        }

        return jwtService.generateToken(userDto.getUsername());
    }


    @Override
    public String register(UserDto userDto) {
        if (userRepository.findByUsername(userDto.getUsername()).isPresent()) {
            throw new AuthenticationException("El usuario ya existe.");
        }

        String hashedPassword = passwordEncoder.encode(userDto.getPassword());
        UserEntity newAppUserEntity = new UserEntity(userDto.getUsername(), hashedPassword);
        userRepository.save(newAppUserEntity);

        return jwtService.generateToken(userDto.getUsername());
    }

    @Override
    public UserEntity getUser() throws AuthenticationException {
        String username = jwtService.getUsername();
        return userRepository.findByUsername(username).orElseThrow(() -> new AuthenticationException("El usuario no existe"));
    }
}
