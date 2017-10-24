package br.com.agenda.agenda.controller;

import br.com.agenda.agenda.domain.Agenda;
import br.com.agenda.agenda.repository.AgendaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/agenda")
public class AgendaController {

    private final AgendaRepository agendaRepository;

    @Autowired
    public AgendaController(AgendaRepository agendaRepository) {
        this.agendaRepository = agendaRepository;
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    @ResponseStatus(value = HttpStatus.OK)
    public List<Agenda> index(){
        return agendaRepository.findAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseStatus(value = HttpStatus.CREATED)
    public void create(@RequestBody Agenda agenda){
        agendaRepository.save(agenda);
    }

    @RequestMapping(value = "/atualizar/{id}", method = RequestMethod.PUT)
    @ResponseStatus(value = HttpStatus.OK)
    public void update(@PathVariable("id") Long id, @RequestBody Agenda agenda){
        agendaRepository.save(agenda);
    }

    @RequestMapping(value = "/excluir/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void delete(@PathVariable("id") Long id){
        agendaRepository.delete(id);
    }

}
