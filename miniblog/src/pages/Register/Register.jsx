import styles from "./Register.module.css";

import { useState, useEffect } from "react";

const Register = () => {
    return (
        <div className="register">
            <h1>Cadastre-se para postar</h1>
            <p>Crie seu usuário e compartilhe suas histórias!</p>
            <form>
                <label>
                    <span>Nome:</span>
                    <input type="text" name="name" required placeholder="Nome do usuário" />
                </label>
                <label>
                    <span>E-mail:</span>
                    <input type="email" name="email" required placeholder="E-mail do usuário" />
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password" name="password" required placeholder="Insira sua senha" />
                </label>
                <label>
                    <span>Confirme sua senha:</span>
                    <input type="password" name="confirmPassword" required placeholder="Confirme sua senha" />
                </label>
                <button className="btn">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;