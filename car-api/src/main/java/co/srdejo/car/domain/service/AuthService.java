package co.srdejo.car.domain.service;


import co.srdejo.car.application.dto.UserDto;
import co.srdejo.car.infrastructure.persistence.entity.UserEntity;

public interface AuthService {

    String createToken(UserDto user);
    String register(UserDto user);
    UserEntity getUser();
}
