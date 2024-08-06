import { Builder, By, until } from "selenium-webdriver"
import {should} from "chai"
import fs from 'fs'

should()

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'))

describe("Radio Popular - Cadastro", function(){
    let driver

    beforeEach(async function(){
        
        //abrindo o site no navedor safari
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.radiopopular.pt/')
        await driver.manage().setTimeouts({implicit: 5000})
        await driver.findElement(By.xpath('//*[@class=" cf1y60" and contains(text(), "Negar")]')).click()
        let seleniumLogo = await driver.findElement(By.css('img[alt="Radio Popular"')).getAttribute('src')
        seleniumLogo.should.equal('https://lojae-s3-prd-files.radiopopular.pt/files/static/images/icons/rp-logo.png')
        await driver.findElement(By.className('button user')).click()
        
        //selecionar cliente particular 
        await driver.findElement(By.xpath('//*[@for="sizePar"]')).click()
        await driver.findElement(By.id('submitcliente')).click()
    })

    afterEach(async function(){
        await driver.quit()
    })

    it('realizando o cadastro com sucesso', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()

        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // let seleniumText = await driver.findElement(By.id('texto2 esquerda')).getText('Registo concluído')
        // seleniumText.should.equal('Registo concluído')

    })

    it('realizando o cadastro em branco', async function(){
        await driver.findElement(By.id('enviar')).click()

        //faltando fazer o shouder.
    })

    it('realizando o cadastro email sem o @', async function(){
        await driver.findElement(By.id('email')).sendKeys('platonfabio')
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        let SeleniumTextEmail = await driver.findElement(By.xpath('//*[@style="display: inline;" and contains(text(), "Formato de Email não está correcto")]')).getText()
        SeleniumTextEmail.should.equal('Formato de Email não está correcto')

    })
    
    it('realizando o cadastro com senha > 8 alfanuméricos', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys('Test123')
        await driver.findElement(By.id('password_rep')).sendKeys('Test123')
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // falta fazer o shoulder

    })

    it('realizando o cadastro com data de nascimento incompleta', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys('28-12')
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        let SeleniumTextPassword = await driver.findElement(By.xpath('//*[@style="display: inline;" and contains(text(), "Data de Nascimento não está preenchida correctamente (dd-mm-aaaa)")]')).getText()
        SeleniumTextPassword.should.equal('Data de Nascimento não está preenchida correctamente (dd-mm-aaaa)')

    })

    it('realizando o cadastro sem o NIF', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // Falta fazer o shoulder

    })

    it('realizando o cadastro sem o código postal', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // Falta fazer o shoulder

    })

    it('realizando o cadastro sem a morada', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // Falta fazer o shoulder

    })

    it('realizando o cadastro sem Porta/andar', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

       // Falta fazer o shoulder

    })

    it('realizando o cadastro sem localidade', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

       // Falta fazer o shoulder

    })

    it('realizando o cadastro sem proteção de dados', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.id('aceito_termos')).click()
        await driver.findElement(By.id('enviar')).click()

        // Falta fazer o shoulder

    })

    it('realizando o cadastro sem Política de privicidade', async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('password_rep')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('generoM')).click()
    
        await driver.findElement(By.id('nome_individuo')).sendKeys(config.NOME)
        await driver.findElement(By.id('data_nascimento')).sendKeys(config.DT_NAS)
        await driver.findElement(By.id('nif')).sendKeys(config.NIF)
        await driver.findElement(By.id('cp4')).sendKeys('4715')
        await driver.findElement(By.id('cp3')).sendKeys('105')
        await driver.findElement(By.id('rua')).sendKeys(config.ENDERECO)
        await driver.findElement(By.id('porta')).sendKeys(config.complemento)
        await driver.findElement(By.id('localidade')).sendKeys(config.localidade)
        await driver.findElement(By.id('contacto')).sendKeys(config.contato)
        await driver.findElement(By.xpath('//*[@class="wrapper_pd" and text()="não"]')).click()
        await driver.findElement(By.id('enviar')).click()

        let SeleniumTextPolitica = await driver.findElement(By.xpath('//*[@style="display: inline;" and contains(text(), "Deve aceitar os termos de uso e políticas de privacidade")]')).getText()
        SeleniumTextPolitica.should.equal('Deve aceitar os termos de uso e políticas de privacidade')

    })

 })

describe("Radio Popular - Login", function(){
    let driver
   
    beforeEach(async function(){
        
        //abrindo o site no navedor safari
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.radiopopular.pt/')
        await driver.manage().setTimeouts({implicit: 5000})
        await driver.findElement(By.xpath('//*[@class=" cf1y60" and contains(text(), "Negar")]')).click()
        let seleniumLogo = await driver.findElement(By.css('img[alt="Radio Popular"')).getAttribute('src')
        seleniumLogo.should.equal('https://lojae-s3-prd-files.radiopopular.pt/files/static/images/icons/rp-logo.png')
        await driver.findElement(By.className('button user')).click()
        
    })

    afterEach(async function(){
        await driver.quit()
    })

    it("Login com sucesso", async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('submitlogin')).click()
    })

    it("Login sem credenciais", async function(){
        await driver.findElement(By.id('submitlogin')).click()
    })

    it("Login sem password", async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('submitlogin')).click()
    })

    it("Login com sucesso", async function(){
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('submitlogin')).click()
    })

    it("Login com email incompleto", async function(){
        await driver.findElement(By.id('email')).sendKeys('platonfabio.com')
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('submitlogin')).click()
    })

    it("Login com password incorreto", async function(){
        await driver.findElement(By.id('email')).sendKeys(config.EMAIL)
        await driver.findElement(By.id('password')).sendKeys('tester123')
        await driver.findElement(By.id('submitlogin')).click()

        let seleniumTextLoginErro = await driver.findElement(By.id('erro')).getText()
        seleniumTextLoginErro.should.equal('Os dados que introduziu não estão correctos.')
    })

    it("Login utilizando NIF ao invés de email", async function(){
        await driver.findElement(By.id('email')).sendKeys(config.NIF)
        await driver.findElement(By.id('password')).sendKeys(config.USER_PASSWORD)
        await driver.findElement(By.id('submitlogin')).click()
    })



})

describe("Radio Popular - Cyber Monday 2024", function(){
    let driver
   
    beforeEach(async function(){
        
        //abrindo o site no navedor safari
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.radiopopular.pt/')
        await driver.manage().setTimeouts({implicit: 5000})
        await driver.findElement(By.xpath('//*[@class=" cf1y60" and contains(text(), "Negar")]')).click()
        let seleniumLogo = await driver.findElement(By.css('img[alt="Radio Popular"')).getAttribute('src')
        seleniumLogo.should.equal('https://lojae-s3-prd-files.radiopopular.pt/files/static/images/icons/rp-logo.png')
        
        // Espera explícita para garantir que o elemento esteja presente e visível
        let linkElement = await driver.wait(until.elementLocated(By.css('a[href="https://www.radiopopular.pt/cyber-monday/"]')), 10000)
        
        // Rola para o elemento
        await driver.executeScript("arguments[0].scrollIntoView(true);", linkElement)
        // Clica no elemento
        await linkElement.click();
        let seleniumCyberMonday = await driver.findElement(By.xpath('//*[@class="display-4 text-center"]')).getText()
        seleniumCyberMonday.should.equal('CYBER MONDAY')

    })

    afterEach(async function(){
        await driver.quit()
    })

    it('Card Som e Imagem', async function () {
        let linkSomImagem = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[1]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkSomImagem)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkSomImagem), 10000);
        await driver.wait(until.elementIsEnabled(linkSomImagem), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkSomImagem.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('SOM E IMAGEM')
        
    })

    it('Card comunicações', async function () {
        let linkComunicacoes = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[2]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkComunicacoes)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkComunicacoes), 10000);
        await driver.wait(until.elementIsEnabled(linkComunicacoes), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkComunicacoes.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('COMUNICAÇÕES')
        
    })

    it('Card Informatica', async function () {
        let linkInformatica = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[3]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkInformatica)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkInformatica), 10000);
        await driver.wait(until.elementIsEnabled(linkInformatica), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkInformatica.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('INFORMÁTICA')
        
    })

    it('Card Gaming', async function () {
        let linkGaming = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[4]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkGaming)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkGaming), 10000);
        await driver.wait(until.elementIsEnabled(linkGaming), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkGaming.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('GAMING')
        
    })

    it('Card Foto e Vídeo', async function () {
        let linkFotoVideo = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[5]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkFotoVideo)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkFotoVideo), 10000);
        await driver.wait(until.elementIsEnabled(linkFotoVideo), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkFotoVideo.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('FOTO E VÍDEO')
        
    })

    it('Card Smarthome e Redes', async function () {
        let linkSmarthomeRede = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[2]/div[1]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkSmarthomeRede)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkSmarthomeRede), 10000);
        await driver.wait(until.elementIsEnabled(linkSmarthomeRede), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkSmarthomeRede.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('SMARTHOME E REDES')
        
    })
    
    it('Card Lazer e Desporto', async function () {
        let linkLazerDesporto = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[2]/div[2]/div')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkLazerDesporto)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkLazerDesporto), 10000);
        await driver.wait(until.elementIsEnabled(linkLazerDesporto), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkLazerDesporto.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('LAZER E DESPORTO')
        
    })

    it('Card Saúde e Beleza', async function () {
        let linkSaudeBeleza = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[2]/div[3]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkSaudeBeleza)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkSaudeBeleza), 10000);
        await driver.wait(until.elementIsEnabled(linkSaudeBeleza), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkSaudeBeleza.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('SAÚDE E BELEZA')
        
    })

    it('Card Grandes Eletrodomésticos', async function () {
        let linkGrandesEletros = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[2]/div[4]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkGrandesEletros)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkGrandesEletros), 10000);
        await driver.wait(until.elementIsEnabled(linkGrandesEletros), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkGrandesEletros.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('GRANDES ELETRODOMÉSTICOS')
        
    })

    it('Card Pequenos Eletrodomésticos', async function () {
        let linkPequenosEletros = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[2]/div[5]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkPequenosEletros)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkPequenosEletros), 10000);
        await driver.wait(until.elementIsEnabled(linkPequenosEletros), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkPequenosEletros.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('PEQUENOS ELETRODOMÉSTICOS')
        
    })

    it('Card Aquecimento e Ventilação', async function () {
        let linkAquecimentoVentilacao = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[3]/div[1]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkAquecimentoVentilacao)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkAquecimentoVentilacao), 10000);
        await driver.wait(until.elementIsEnabled(linkAquecimentoVentilacao), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkAquecimentoVentilacao.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('AQUECIMENTO E VENTILAÇÃO')
        
    })
    
    it('Card Auto e GPS', async function () {
        let linkAutoGPS = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[3]/div[2]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkAutoGPS)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkAutoGPS), 10000);
        await driver.wait(until.elementIsEnabled(linkAutoGPS), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkAutoGPS.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('AUTO E GPS')
        
    })

    it('Card Iluminação e Eletricidade', async function () {
        let linkIluminacaoEletro = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[3]/div[3]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkIluminacaoEletro)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkIluminacaoEletro), 10000);
        await driver.wait(until.elementIsEnabled(linkIluminacaoEletro), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkIluminacaoEletro.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('ILUMINAÇÃO E ELETRICIDADE')
        
    })

    it('Card Experiência e Gift Cards', async function () {
        let linkGift = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[3]/div[4]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkGift)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkGift), 10000);
        await driver.wait(until.elementIsEnabled(linkGift), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkGift.click();

        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('EXPERIÊNCIAS E GIFT CARD')
        
    })

})

describe("Radio Popular - Comprar produto Cyber Monday 2024", function(){
    let driver
   
    beforeEach(async function(){
        
        //abrindo o site no navedor safari
        driver = await new Builder().forBrowser('firefox').build()
        await driver.get('https://www.radiopopular.pt/')
        await driver.manage().setTimeouts({implicit: 5000})
        await driver.findElement(By.xpath('//*[@class=" cf1y60" and contains(text(), "Negar")]')).click()
        let seleniumLogo = await driver.findElement(By.css('img[alt="Radio Popular"')).getAttribute('src')
        seleniumLogo.should.equal('https://lojae-s3-prd-files.radiopopular.pt/files/static/images/icons/rp-logo.png')
        
        // Espera explícita para garantir que o elemento esteja presente e visível
        let linkElement = await driver.wait(until.elementLocated(By.css('a[href="https://www.radiopopular.pt/cyber-monday/"]')), 10000)
        
        // Rola para o elemento
        await driver.executeScript("arguments[0].scrollIntoView(true);", linkElement)
        // Clica no elemento
        await linkElement.click();
        let seleniumCyberMonday = await driver.findElement(By.xpath('//*[@class="display-4 text-center"]')).getText()
        seleniumCyberMonday.should.equal('CYBER MONDAY')

    })

    afterEach(async function(){
        //await driver.quit()
    })

    it('Comprando um produto da categoria Gaming', async function () {
        let linkSomImagem = await driver.wait(until.elementLocated(By.xpath('/html/body/main/div[3]/div/section/div[3]/div[1]/div[1]/div[4]')), 10000)
        // Adicionar um pequeno atraso para garantir que a página está totalmente carregada
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", linkSomImagem)
        // Espera explícita para garantir que o elemento esteja visível e clicável
        await driver.wait(until.elementIsVisible(linkSomImagem), 10000);
        await driver.wait(until.elementIsEnabled(linkSomImagem), 10000);
        // Adicionar um pequeno atraso para garantir que o scroll foi concluído
        await new Promise(resolve => setTimeout(resolve, 2000));
        await linkSomImagem.click();
        
        let seleniumSomImagem = await driver.findElement(By.xpath('/html/body/main/div[2]/h1')).getText()
        seleniumSomImagem.should.equal('GAMING')
        
        //selecionando a tipologia Acessório PS5
        await driver.findElement(By.id('category_n3_name-4')).click()
        let leitorSonyPs5 = await driver.wait(until.elementLocated(By.xpath('//*[@class="module product link fl cb free-delivery buy_visible" and @data-product="113001"]')), 10000)
        await new Promise(resolve => setTimeout(resolve, 5000))
        await driver.executeScript("arguments[0].scrollIntoView({block: 'center', inline: 'nearest'});", leitorSonyPs5)
        await driver.wait(until.elementIsVisible(leitorSonyPs5), 10000);
        await driver.wait(until.elementIsEnabled(leitorSonyPs5), 10000);
        await new Promise(resolve => setTimeout(resolve, 2000));
        await leitorSonyPs5.click();

        await driver.findElement(By.className('button buy fl uppercase center-text desktop-only visible')).click()
        await driver.findElement(By.xpath('//*[@for="L"]')).click()
        await driver.findElement(By.id('zonas_sel_L')).sendKeys('N')
        await driver.findElement(By.id('loja_54')).click()
        await driver.findElement(By.id('bt-seguir')).click()
     })

})