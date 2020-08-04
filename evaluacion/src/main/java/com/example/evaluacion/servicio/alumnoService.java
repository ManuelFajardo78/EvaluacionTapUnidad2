/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.example.evaluacion.servicio;


import com.example.evaluacion.model.Alumno;
import java.util.List;


public interface alumnoService {
    List<Alumno>listar();
    Alumno listarId(String id);
    Alumno add(Alumno u);
Alumno edit(Alumno u);
    void delete(String id);
    
}
