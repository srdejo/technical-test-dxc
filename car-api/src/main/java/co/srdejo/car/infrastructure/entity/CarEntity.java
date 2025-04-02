package co.srdejo.car.infrastructure.entity;


import co.srdejo.car.application.dto.CarDto;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "car")
public class CarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String brand;
    private String model;
    private int year;
    private String licensePlate;
    private String color;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;


    public void update(CarDto carDto) {
        this.brand = carDto.getBrand() != null ? carDto.getBrand() : this.brand;
        this.model = carDto.getModel() != null ? carDto.getModel() : this.model;
        this.year = carDto.getYear() > 0 ? carDto.getYear() : this.year;
        this.licensePlate = carDto.getLicensePlate() != null ? carDto.getLicensePlate() : this.licensePlate;
        this.color = carDto.getColor() != null ? carDto.getColor() : this.color;
    }
}
