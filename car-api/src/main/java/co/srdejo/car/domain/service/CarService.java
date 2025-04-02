package co.srdejo.car.domain.service;

import co.srdejo.car.application.dto.CarDto;
import co.srdejo.car.application.dto.CarDtoResponse;

import java.util.List;

public interface CarService {
    CarDto getCarDto(Long id);
    CarDto createCarDto(CarDto carDto);
    List<CarDtoResponse> getAllCars();
    CarDto updateCarDto(long id, CarDto carDto);
    void deleteCarDto(Long id);
}
