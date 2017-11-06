package br.com.agenda.agenda.controller;

import br.com.agenda.agenda.domain.Login;
import br.com.agenda.agenda.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/login")
public class LoginController {

    private final LoginService service;

    @Autowired
    public LoginController(LoginService service) {
        this.service = service;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public List<Login> index() {
        return service.buscarLogin();
    }
}
