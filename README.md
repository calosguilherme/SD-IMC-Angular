# Passo a Passo para rodar o projeto com front + back + container
### Obs: Na data 11/12/2018 esse passo a passo era instavel no Windows, recomendo utilizar uma máquina com Linux(Mint/Ubuntu)
## Preparando Back
(Você precisa já ter o docker instalado) Primeiro faça o download do [Backend](https://github.com/calosguilherme/sdBackend) para criar um container no Docker, o Dockerfile já está criado dentro do projeto do back, basta subir ele(da um push) do arquivo para a sua conta[DockerHub](https://hub.docker.com/).

## Instalando e configurando o Rancher e Containers
Digite o seguinte comando para 'criar' um container com o Rancher Server:
	docker run -d --restart=unless-stopped -p 8080:8080 rancher/server
Após isso, digite o seguinte comando para 'criar um segundo container que sera usado como host no Rancher:
  docker run --privileged --name some-docker2 -d docker:stable-dind
Em seguida rode o comando:
                          docker ps
Ele irá retornar todos os containers rodando e seus Ids, anote o id do segundo container o com nome some-docker2 e rode o seguinte comando:
                          docker inpect <<IdDoContainer>>
Anote o Ipadress que o comando retorna. Abra o Rancher no navegador, IP:8080, esse ip caso não tenha você pode conseguir da mesma forma. Clique em INFRASTRUCTURE e em Add Host, após isso informe o IP do segundo container criado e ele irá gerar uma linha de comando como a seguir:
                          docker run -e CATTLE_AGENT_IP="SeuIpDoSegundoContainer"  --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11 http://172.17.0.2:8080/v1/scripts/5E818F8A4554FC6C4605:1514678400000:ZNipvYOBURhAKOSVZ0WCrqjsk

Utilize o gerado pelo seu rancher em vez de copiar o daqui, caso tenha alguma duvida pode seguir esse passo a passo [AQUI](https://onebitcode.com/o-que-e-e-como-funciona-o-rancher/)

Após isso crie os Stacks, 1 para o Balancer e quantos quiser para o Back. para o Back você pode adicionar o seguinte

Composer Docker:
            version: '2'
          services:
            carlos-back:
              image: calosguilherme/sd
              stdin_open: true
              tty: true
              ports:
              - 3000:3000/tcp
              labels:
                io.rancher.container.pull_image: always
                io.rancher.scheduler.global: 'true'

Compose Rancher - 
              version: '2'
              services:
                carlos-back:
                  start_on_create: true

Para o Balancer você pode adicionar o seguinte compose


Compose Rancher - Lembrando de alterar o hostname pelo ip do seu HOST
                  version: '2'
                  services:
                    balancer:
                      start_on_create: true
                      lb_config:
                        certs: []
                        port_rules:
                        - hostname: 172.17.0.5
                          path: ''
                          priority: 1
                          protocol: http
                          service: carlos-trab/carlos-back
                          source_port: 3000
                          target_port: 3000
                      health_check:
                        response_timeout: 2000
                        healthy_threshold: 2
                        port: 42
                        unhealthy_threshold: 3
                        initializing_timeout: 60000
                        interval: 2000
                        reinitializing_timeout: 60000

Nesse caso só será criado um container de Back, você terá que repetir o processo de criação de Back pra quantos mais desejar, já o balancer será necessário clicar nós 3 pontinhos e ir em UPGRADE pra adicionar manualmente os outros Back. feito isso a parte de Container e back está terminada.

## Preparando o Front
Primeiro baixe esse projeto, em seguida acesse a pasta SRC/APP/Controller/Services nos dois arquivos que tem, altere o IP do service para o IP do host inserido no balance. Após isso dentro da pasta do projeto execute o comando. (Precisa do NodeJS)
  npm install
  ng serve

Aplicação está pronta para uso

# Sd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
