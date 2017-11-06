package br.com.agenda.agenda.service.impl;

import br.com.agenda.agenda.domain.Login;
import br.com.agenda.agenda.repository.LoginRepository;
import br.com.agenda.agenda.service.LoginService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoginServiceImpl implements LoginService {

    private final LoginRepository repository;

    public LoginServiceImpl(LoginRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Login> buscarLogin() {
        return repository.findAll();
    }
}
