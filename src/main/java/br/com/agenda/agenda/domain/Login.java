package br.com.agenda.agenda.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class Login implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    private String senha;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Login)) return false;

        Login login = (Login) o;

        if (getId() != null ? !getId().equals(login.getId()) : login.getId() != null) return false;
        if (getNome() != null ? !getNome().equals(login.getNome()) : login.getNome() != null) return false;
        return getSenha() != null ? getSenha().equals(login.getSenha()) : login.getSenha() == null;
    }

    @Override
    public int hashCode() {
        int result = getId() != null ? getId().hashCode() : 0;
        result = 31 * result + (getNome() != null ? getNome().hashCode() : 0);
        result = 31 * result + (getSenha() != null ? getSenha().hashCode() : 0);
        return result;
    }
}
