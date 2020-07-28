
package com.example.evaluacion.repository;

import com.example.evaluacion.model.Alumno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepositorio extends JpaRepository<Alumno, String>{
    @Query(value="Select al from alumno al where al.cedula = cedula")
    List<Alumno> buscarPorcedula(@Param("cedula")String cedula);
}
