
package com.example.evalucacion.controlador;

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

@RestController
@RequestMapping("/api/vl")
public class AlumnoControl {
     @Autowired
    private AlumnoRepositorio alumnoR;
     
    @GetMapping("/alumno")
    public List<Alumno> getAllEmpleado(){
        return alumnoR.findAll();
    }
    
    @RequestMapping(value="/alumno/{cedula}", method=RequestMethod.GET)
    public List<Alumno> getEmpleadoById(String cedula) {
        return alumnoR.buscarPorcedula(cedula);
    }
    
    @PostMapping("/alumno")
    @ResponseBody
    @CrossOrigin
    public Alumno createAlumno(@Valid @RequestBody Alumno alumno){
        return alumnoR.save(alumno);
        
    }
    
}
