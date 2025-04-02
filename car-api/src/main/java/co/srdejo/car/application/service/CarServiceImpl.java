package co.srdejo.car.application.service;

import co.srdejo.car.application.dto.CarDto;
import co.srdejo.car.application.mapper.CarMapper;
import co.srdejo.car.domain.exception.CarNotFoundException;
import co.srdejo.car.domain.exception.UnauthorizedAccessException;
import co.srdejo.car.domain.model.Car;
import co.srdejo.car.domain.service.AuthService;
import co.srdejo.car.domain.service.CarService;
import co.srdejo.car.infrastructure.entity.CarEntity;
import co.srdejo.car.infrastructure.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarServiceImpl implements CarService {

    private final CarRepository carRepository;
    private final AuthService authService;

    public CarServiceImpl(CarRepository carRepository, AuthService authService) {
        this.carRepository = carRepository;
        this.authService = authService;
    }

    @Override
    public CarDto getCarDto(Long id) {
        return CarMapper.toDto(findCarById(id));
    }

    @Override
    public CarDto createCarDto(CarDto carDto) {
        Car car = CarMapper.toDomain(carDto);
        car.assignOwner(authService.getUser());
        CarEntity carEntity = CarMapper.toEntity(car);
        return CarMapper.toDto(carRepository.save(carEntity));
    }

    @Override
    public List<CarDto> getAllCars() {
        return CarMapper.toDtoList(carRepository.findByUser(authService.getUser()));
    }

    @Override
    public CarDto updateCarDto(long id, CarDto carDto) {
        CarEntity carEntity = findCarById(id);
        Car car = CarMapper.toDomain(carEntity);
        car.update(carDto);
        return CarMapper.toDto(carRepository.save(CarMapper.toEntity(car)));
    }

    @Override
    public void deleteCarDto(Long id) {
        findCarById(id);
        carRepository.deleteById(id);
    }

    private CarEntity findCarById(long id) {
        CarEntity carEntity = carRepository.findById(id).orElseThrow(()-> new CarNotFoundException("Carro con id "+id+" no encontrado."));
        if(!carEntity.getUser().getUsername().equals(authService.getUser().getUsername())) {
            throw new UnauthorizedAccessException("No tienes permiso para modificar este carro");
        }
        return carEntity;
    }
}
