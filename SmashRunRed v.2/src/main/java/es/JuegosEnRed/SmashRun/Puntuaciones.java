package es.JuegosEnRed.SmashRun;

public class Puntuaciones {
	
	// Variables
	public String nombre;
	public int puntuacion;

	// Constructor
	public Puntuaciones() {
		
	}
	
	// Getters & Setters
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public int getPuntuacion() {
		return puntuacion;
	}

	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	
	// Methods
	// Determina si la nueva puntuacion es la puntuacion mas alta o no
	/*public void highScore(int nuevoScore) {
		if(nuevoScore > HScore) {
			HScore = nuevoScore;
		}
	}
	
	public void ordenPunt(Puntuaciones nuevaPunt) {
		boolean actualizado = false;
		
		for(int i = 0; i < listPunt.length && actualizado == false; i++) {
			// Añade la nueva puntuacion al lugar donde le corresponde en la lista
			if(nuevaPunt.puntuacion > listPunt[i].puntuacion) {
				Puntuaciones aux = listPunt[i];
				listPunt[i] = nuevaPunt;
				
				// Mueve las siguientes posiciones a la posicion siguiente
				for(int j = i; j < 10; j++) {
					// si la siguiente posicion tiene una puntuacion guardada
					if(j < 9 && listPunt[j+1] != null) {
						Puntuaciones aux2 = listPunt[j+1];
						listPunt[j+1] = aux;
						aux = aux2;
					}
					// si la siguiente posicion no tiene una puntuacion guardada o es la ultima puntuacion
					else if((j < 9 || j == 9) && listPunt[j+1] == null) {
						listPunt[j+1] = aux;
					}
				}
				
				actualizado = true;
			}
		}
	}*/
}
