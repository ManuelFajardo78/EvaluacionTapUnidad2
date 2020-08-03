/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.evaluacion.rest;

import com.example.evaluacion.model.Alumno;
import com.example.evaluacion.repository.AlumnoRepositorio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.evaluacion.servicio.alumnoService;


@Service
public class alumnoServiceImp implements alumnoService {
    @Autowired
    private AlumnoRepositorio repositorio;
    @Override
    public List<Alumno> listar() {
        return repositorio.findAll();
    }

    @Override
    public Alumno listarId(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Alumno add(Alumno u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Alumno edit(Alumno u) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Alumno delete(int id) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
