
package com.example.evaluacion.controller;

import com.example.evaluacion.model.Alumno;
import com.example.evaluacion.repository.AlumnoRepositorio;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3200 )
@RestController
@RequestMapping("/api/v1")
public class AlumnoController {
     @Autowired
    private AlumnoRepositorio alumnoR;
     
    @GetMapping("/alumno")
    public List<Alumno> getAllAlumno(){
        return alumnoR.findAll();
    }
    
    @RequestMapping(value="/alumno/{idalumno}", method=RequestMethod.GET)
    public List<Alumno> getAlumno(String cedula) {
        return alumnoR.buscarPorCedula(cedula);
    }
    
    @PostMapping("/alumno")
    @ResponseBody
    @CrossOrigin
    public Alumno createAlumno(@Valid @RequestBody Alumno alumno){
        return alumnoR.save(alumno);
    }
    
}
