package br.com.agenda.agenda.service;

import br.com.agenda.agenda.domain.Agenda;

import java.util.List;

public interface AgendaService {

    List<Agenda> listarContatos();

    void criarContato(Agenda agenda);

    void deletarContato(Long id);

    void atualizarContato(Long id, Agenda agenda);

    Agenda buscarContato(Long id);

}
