package co.srdejo.car.application.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
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
    @JsonAlias("marca")
    private String brand;
    @NotBlank(message = "El modelo es obligatorio")
    @JsonAlias("modelo")
    private String model;
    @NotNull(message = "El año es obligatorio")
    @Positive(message = "El año debe ser un valor valido")
    @JsonAlias("ano")
    private Integer year;
    @NotBlank(message = "La placa es obligatoria")
    @JsonAlias("placa")
    private String licensePlate;
    @NotBlank(message = "El color es obligatorio")
    @JsonAlias("color")
    private String color;


}
