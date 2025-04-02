package co.srdejo.car.domain.exception;

public class InvalidCarDataException extends RuntimeException {
    public InvalidCarDataException(String message) {
        super(message);
    }
}
