package co.srdejo.car.application.mapper;

import co.srdejo.car.application.dto.CarDto;
import co.srdejo.car.domain.model.Car;
import co.srdejo.car.infrastructure.entity.CarEntity;

import java.util.List;
import java.util.stream.Collectors;

public class CarMapper {

    // Convierte de DTO a dominio
    public static Car toDomain(CarDto carDto) {
        return new Car(
                carDto.getBrand(),
                carDto.getModel(),
                carDto.getYear(),
                carDto.getLicensePlate(),
                carDto.getColor()
        );
    }

    // Convierte de dominio a entidad
    public static CarEntity toEntity(Car car) {
        return new CarEntity(
                null, // ID se genera en la BD
                car.getBrand(),
                car.getModel(),
                car.getYear(),
                car.getLicensePlate(),
                car.getColor(),
                car.getOwner()
        );
    }

    // Convierte de entidad a dominio
    public static Car toDomain(CarEntity carEntity) {
        return new Car(
                carEntity.getBrand(),
                carEntity.getModel(),
                carEntity.getYear(),
                carEntity.getLicensePlate(),
                carEntity.getColor()
        );
    }

    public static CarDto toDto(CarEntity entity) {
        CarDto dto = new CarDto();
        dto.setBrand(entity.getBrand());
        dto.setModel(entity.getModel());
        dto.setYear(entity.getYear());
        dto.setLicensePlate(entity.getLicensePlate());
        dto.setColor(entity.getColor());
        return dto;
    }



    public static List<CarDto> toDtoList(Iterable<CarEntity> cars) {
        if (cars == null) {
            return List.of();
        }

        return ((List<CarEntity>) cars).stream()
                .map(CarMapper::toDto)
                .collect(Collectors.toList());
    }
}

