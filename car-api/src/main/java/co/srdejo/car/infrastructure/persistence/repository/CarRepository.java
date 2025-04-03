package co.srdejo.car.infrastructure.persistence.repository;

import co.srdejo.car.infrastructure.persistence.entity.CarEntity;
import co.srdejo.car.infrastructure.persistence.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CarRepository extends CrudRepository<CarEntity, Long> {
    List<CarEntity> findByUser(UserEntity user);
}
