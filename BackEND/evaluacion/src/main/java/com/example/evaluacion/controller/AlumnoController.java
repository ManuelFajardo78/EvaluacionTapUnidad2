
package com.example.evaluacion.controller;

import com.example.evaluacion.model.Alumno;
import com.example.evaluacion.repository.AlumnoRepositorio;
import com.example.evaluacion.servicio.alumnoService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3200 )
@RestController
@RequestMapping("/api/v1")
public class AlumnoController {
     @Autowired
    private AlumnoRepositorio alumnoR;
     alumnoService alS;
     
    @GetMapping("/alumno")
    public List<Alumno> getAllAlumno(){
        return alumnoR.findAll();
    }
    
    @GetMapping(value="/alumno/{cedula}")
    public Alumno getAlumno(String cedula) {
        return alumnoR.buscarPorCedula(cedula);
    }
    
    @GetMapping("/alumno/estado")
    public List<Alumno> obtnAllAlumno(){
        return alumnoR.buscarEstado();
    }
    
    @PostMapping("/alumno")
    @ResponseBody
    @CrossOrigin
    public Alumno createAlumno(@Valid @RequestBody Alumno alumno){
        return alumnoR.save(alumno);
    }
    
}
