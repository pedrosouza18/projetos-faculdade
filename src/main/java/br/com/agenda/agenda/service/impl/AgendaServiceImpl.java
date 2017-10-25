package br.com.agenda.agenda.service.impl;

import br.com.agenda.agenda.domain.Agenda;
import br.com.agenda.agenda.repository.AgendaRepository;
import br.com.agenda.agenda.service.AgendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendaServiceImpl implements AgendaService {

    private final AgendaRepository repository;

    @Autowired
    public AgendaServiceImpl(AgendaRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Agenda> listarContatos() {
        return repository.findAll();
    }

    @Override
    public void criarContato(Agenda agenda) {
        repository.save(agenda);
    }

    @Override
    public void deletarContato(Long id) {
        repository.delete(id);
    }

    @Override
    public void atualizarContato(Long id, Agenda agenda) {
        repository.save(agenda);
    }
}


