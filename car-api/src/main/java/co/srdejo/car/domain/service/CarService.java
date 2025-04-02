package co.srdejo.car.domain.service;

import co.srdejo.car.application.dto.CarDto;

import java.util.List;

public interface CarService {
    CarDto getCarDto(Long id);
    CarDto createCarDto(CarDto carDto);
    List<CarDto> getAllCars();
    CarDto updateCarDto(long id, CarDto carDto);
    void deleteCarDto(Long id);
}
