package co.srdejo.car.domain.service;

import org.apache.tomcat.websocket.AuthenticationException;

public interface JwtTokenService {
    String generateToken(String username);
    String getUsername() throws AuthenticationException;
}
