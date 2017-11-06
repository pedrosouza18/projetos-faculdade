package br.com.agenda.agenda.controller;

import br.com.agenda.agenda.domain.Agenda;
import br.com.agenda.agenda.repository.AgendaRepository;
import br.com.agenda.agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/agenda")
public class AgendaController {

    private final AgendaService agendaService;

    @Autowired
    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public List<Agenda> index(){
        return agendaService.listarContatos();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void create(@RequestBody Agenda agenda){
        agendaService.criarContato(agenda);
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void update(@PathVariable("id") Long id, @RequestBody Agenda agenda){
        agendaService.atualizarContato(id, agenda);
    }

    @RequestMapping(value = "/excluir/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void delete(@PathVariable("id") Long id){
        agendaService.deletarContato(id);
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public Agenda buscarContato(@PathVariable("id") Long id){
        return agendaService.buscarContato(id);
    }

}
