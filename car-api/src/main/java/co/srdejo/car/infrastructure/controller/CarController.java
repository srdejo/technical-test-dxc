package co.srdejo.car.infrastructure.controller;

import co.srdejo.car.application.dto.CarDto;
import co.srdejo.car.domain.service.CarService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/car")
public class CarController {

    private final CarService carService;
    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping()
    public List<CarDto> getCars() {
        return carService.getAllCars();
    }


    @GetMapping("/{id}")
    public CarDto getCar(@PathVariable long id) {
        return carService.getCarDto(id);
    }

    @PostMapping()
    public CarDto createCar(@Valid @RequestBody CarDto carDto) {
        return carService.createCarDto(carDto);
    }

    @PutMapping("/{id}")
    public CarDto updateCar(@PathVariable Long id,@Valid @RequestBody CarDto carDto) {
        return carService.updateCarDto(id, carDto);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCarDto(id);
    }


}
