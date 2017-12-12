package es.JuegosEnRed.SmashRun;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@SpringBootApplication
@EnableWebSocket
public class SmashRunRedApplication implements WebSocketConfigurer {
	
	public static void main(String[] args) {
		SpringApplication.run(SmashRunRedApplication.class, args);
	}
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(createPositionHandler(), "/pos")
			.setAllowedOrigins("*");
	}
	
	@Bean
	public PositionHandler createPositionHandler() {
		return new PositionHandler();
	}
}