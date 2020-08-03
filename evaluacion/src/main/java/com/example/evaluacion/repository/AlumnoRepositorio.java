
package com.example.evaluacion.repository;

import com.example.evaluacion.model.Alumno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AlumnoRepositorio extends JpaRepository<Alumno, Long>{
    @Query(value="Select al from Alumno al where al.cedula = cedula")
    List<Alumno> buscarPorCedula(@Param("cedula")String cedula);
    //metodo del daniel
    List <Alumno> findAll();
    Alumno save(Alumno u);
    void delete (Alumno u);
}
