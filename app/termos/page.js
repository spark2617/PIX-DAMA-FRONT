import React from 'react'

function Termos() {
    return (
        <main className='h-ful w-full flex items-center justify-center flex-col text-white py-5 px-10'>
            <h1 className='text-2xl font-bold'>Termos da Plataforma</h1>
            <div className='flex flex-col gap-5'>
                <p>Ao se cadastrar e utilizar nossa plataforma, você concorda com os seguintes termos e condições. Se não concordar com qualquer parte desses termos, por favor, não utilize nossa plataforma.Para utilizar nossos serviços, você deve criar uma conta fornecendo informações precisas e atualizadas. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorram em sua conta.</p>
                <p><span className='font-bold'>Integridade e Fair Play: </span>Nossos jogos são projetados para serem justos e livres de trapaças. Qualquer tentativa de manipulação ou comportamento fraudulento resultará em sanções, incluindo a suspensão ou exclusão da conta.</p>
                <p><span className='font-bold'>Proteção de Dados: </span>Seguimos rigorosos padrões de proteção de dados e cumprimos todas as regulamentações aplicáveis, como a GDPR. Seus dados pessoais são armazenados em servidores seguros e só são acessíveis por pessoal autorizado.</p>
                <p><span className='font-bold'>Métodos de Pagamento: </span>Trabalhamos com processadores de pagamento confiáveis, todas as transações são protegidas por autenticação de dois fatores. </p>
                <p><span className='font-bold'>Taxas: </span> Uma taxa de R$1,00 por partida é cobrada, dividida igualmente entre os jogadores (R$0,50 por jogador).   </p>
                <p><span className='font-bold'>Políticas de Privacidade:</span>

                </p>
                <ul className='list-disc'>
                    <li><p><span className='font-bold'>Coleta de Dados: </span>Coletamos apenas as informações necessárias para fornecer nossos serviços.
                        Uso de Dados: Seus dados pessoais são usados exclusivamente para facilitar a operação da plataforma e melhorar sua experiência de usuário.</p></li>
                    <li><p><span className='font-bold'>Uso de Dados: </span>
                        Seus dados pessoais são usados exclusivamente para facilitar a operação da plataforma e melhorar sua experiência de usuário.</p></li>
                    <li><p><span className='font-bold'>Compartilhamento de Dados: </span>
                        Nunca compartilhamos seus dados com terceiros sem seu consentimento explícito, exceto quando exigido por lei.</p></li>


                </ul>
                <ol className='list-decimal'>
                    <li>Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre quaisquer alterações significativas. O uso continuado da plataforma após a notificação constitui aceitação dos termos modificados.</li>
                    <li>Não seremos responsáveis por quaisquer danos indiretos, incidentes,        especiais, consequenciais ou punitivos decorrentes do uso da nossa plataforma.</li>
                    <li>Estes termos são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes termos será resolvida nos tribunais competentes do Brasil.</li>
                </ol>
                <p>Ao criar uma conta e utilizar nossos serviços, você confirma que leu, entendeu e concorda com todos os termos e condições aqui estabelecidos.</p>
            </div>
        </main>
    )
}

export default Termos