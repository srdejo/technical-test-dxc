package co.srdejo.car.domain.model;

import co.srdejo.car.domain.exception.InvalidCarDataException;
import co.srdejo.car.infrastructure.entity.UserEntity;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Objects;

@Getter
public class Car {
    private String brand;
    private String model;
    private int year;
    private String licensePlate;
    private String color;
    private UserEntity owner;

    public Car(String brand, String model, int year, String licensePlate, String color) {

        if (year > LocalDate.now().getYear()) {
            throw new InvalidCarDataException("El año no puede ser superior al actual .");
        }

        if (licensePlate == null || !licensePlate.matches("^[A-Za-z]{3}\\d{3}$")) {
            throw new InvalidCarDataException("El formato de la placa es inválido. Debe ser 3 letras seguidas de 3 dígitos.");
        }

        this.brand = brand;
        this.model = model;
        this.year = year;
        this.licensePlate = licensePlate;
        this.color = color;
    }

    public void assignOwner(UserEntity owner) {
        if (Objects.isNull(owner)) {
            throw new InvalidCarDataException("El propietario no puede ser nulo.");
        }
        this.owner = owner;
    }

}
