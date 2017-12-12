package es.JuegosEnRed.SmashRun;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PuntuacionesController {
	
	// Variables
	private ArrayList<Puntuaciones> scores = new ArrayList<>();
	
	//Methods
	// Devuelve la lista de puntuaciones
	@RequestMapping(value = "/puntuacion", method = RequestMethod.GET)
	public ArrayList<Puntuaciones> getScores() {	
		return scores;
	}
	
	// Añade una puntuacion
	@RequestMapping(value = "/puntuacion", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addScore(@RequestBody Puntuaciones puntuacion) {
		scores.add(puntuacion);
		
		return new ResponseEntity<>(true, HttpStatus.CREATED);
	}
}
