
package com.example.evaluacion.repository;

import com.example.evaluacion.model.Alumno;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface AlumnoRepositorio extends JpaRepository<Alumno, Long>{
    @Query(value="Select a from Alumno a where a.cedula = :cedula")
    Alumno buscarPorCedula(@Param("cedula")String cedula);
    @Query(value="Select a from Alumno a where a.estado = true")
    List<Alumno> buscarEstado();
    //metodos
    @Override
    List <Alumno> findAll();
    @Override
    Alumno save(Alumno u);
    @Override
    void delete (Alumno u);
}
