package co.srdejo.car.application.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UserDto {
    @NotBlank(message = "El usuario es obligatorio")
    @JsonAlias("usuario")
    private String username;
    @NotBlank(message = "La clave es obligatoria")
    @JsonAlias("clave")
    private String password;

    public UserDto(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
