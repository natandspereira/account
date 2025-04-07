import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";

console.log("Iniciamos o Account");
operation();

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar conta',
            'Consultar saldo',
            'Depositar',
            'Sacar',
            'Sair',
        ]
    }])
    .then((answer) => {
        const action = answer['action'];

        if (action === 'Criar conta') {
            createAccount();
        } else if (action === 'Consultar saldo') {
            getAccountBalance();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {
            withdraw();
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.white('Obrigado por usar o Accounts!'));
            process.exit();
        }
    })
    .catch((err) => console.log(err));
}

function createAccount() {
    console.log(chalk.bgGreen.white('Defina as opções da sua conta'));
    buildAccount();
}

function buildAccount() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite um nome para sua conta: ',
    }])
    .then((answer) => {
        const accountName = answer.accountName;

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgBlue.white('Esta conta já existe, escolha outro nome.'));
            buildAccount();
            return;
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify({ balance: 0 }, null, 2)
        );

        console.log(chalk.green('Parabéns, a conta foi criada com sucesso!'));
        operation();
    })
    .catch((error) => console.log(error));
}

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da sua conta: ',
    }])
    .then((answer) => {
        const accountName = answer.accountName;

        if (!checkAccount(accountName)) {
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);
        console.log(chalk.bgBlue.white(`O saldo da conta ${accountName} é R$${accountData.balance}`));
        operation();
    })
    .catch((err) => console.log(err));
}

function deposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta para depósito: ',
    }])
    .then((answer) => {
        const accountName = answer.accountName;

        if (!checkAccount(accountName)) {
            return deposit();
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Digite o valor do depósito: ',
        }])
        .then((answer) => {
            const amount = parseFloat(answer.amount);

            if (isNaN(amount) || amount <= 0) {
                console.log(chalk.bgRed.white('Digite um valor válido!'));
                return deposit();
            }

            const accountData = getAccount(accountName);
            accountData.balance += amount;

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                JSON.stringify(accountData, null, 2)
            );

            console.log(chalk.green(`Depósito de R$${amount} realizado com sucesso!`));
            operation();
        });
    })
    .catch((err) => console.log(err));
}

function withdraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Digite o nome da conta para saque: ',
    }])
    .then((answer) => {
        const accountName = answer.accountName;

        if (!checkAccount(accountName)) {
            return withdraw();
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Digite o valor do saque: ',
        }])
        .then((answer) => {
            const amount = parseFloat(answer.amount);

            if (isNaN(amount) || amount <= 0) {
                console.log(chalk.bgRed.white('Digite um valor válido!'));
                return withdraw();
            }

            const accountData = getAccount(accountName);

            if (accountData.balance < amount) {
                console.log(chalk.bgRed.white('Saldo insuficiente!'));
                return withdraw();
            }

            accountData.balance -= amount;

            fs.writeFileSync(
                `accounts/${accountName}.json`,
                JSON.stringify(accountData, null, 2)
            );

            console.log(chalk.green(`Saque de R$${amount} realizado com sucesso!`));
            operation();
        });
    })
    .catch((err) => console.log(err));
}

// Função utilitária para verificar se a conta existe
function checkAccount(accountName) {
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.white('Esta conta não existe, escolha outro nome.'));
        return false;
    }
    return true;
}

// Função utilitária para ler dados da conta
function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, { encoding: 'utf8' });
    return JSON.parse(accountJSON);
}
