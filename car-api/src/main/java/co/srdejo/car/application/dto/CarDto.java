package co.srdejo.car.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CarDto {

    @NotBlank(message = "La marca es obligatoria")
    private String brand;
    @NotBlank(message = "El modelo es obligatorio")
    private String model;
    @NotNull(message = "El año es obligatorio")
    @Positive(message = "El año debe ser un valor valido")
    private Integer year;
    @NotBlank(message = "La placa es obligatoria")
    private String licensePlate;
    @NotBlank(message = "El color es obligatorio")
    private String color;


}
