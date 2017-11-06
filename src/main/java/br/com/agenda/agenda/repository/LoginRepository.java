package br.com.agenda.agenda.repository;

import br.com.agenda.agenda.domain.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository  extends JpaRepository<Login, Long>{
}
