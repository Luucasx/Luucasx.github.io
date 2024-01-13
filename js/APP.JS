$(document).ready(function(){
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {

    init: () => {
        cardapio.metodos.obterItensCardapio();
    }
}

cardapio.metodos = {
    //obtem a lista do cardápio//
    obterItensCardapio: (categoria = 'burgers', vermais = false) => {

        var filtro = MENU[categoria]
        console.log(filtro)

        if(!vermais) {
            $("#itensCardapio").html('')
            $("btnVerMais").removeClass('hidden')
        }

        $.each(filtro, (i, e) =>{

        let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
        .replace(/\${nome}/g, e.name)
        .replace(/\${preco}/g, e.price.toFixed(2).replace('.', ','))
        
            //Botão ver mais quando for clicado//
            if (vermais && i >= 8 && i < 12) {
                $("#itensCardapio").append(temp)
            }

            //Paginação inicial (8 itens)//
            if(!vermais && i < 8) {
                $("#itensCardapio").append(temp)
            }

        })

        //remove ativo
        $(".container-menu a").removeclass('active');

        //seta o enu para ativo
        $("#menu-" + categoria).addClass('active')
    },

    //Clique no botão ver mais
        verMais: () => {

        var ativo = $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);

        $("#btnVerMais").addClass('hidden');

    },
}

cardapio.templates = {

    item: `<div class="col-3 mb-5">
    <div class="card card-item">
        <div class="img-produto">
            <img src="\${img}" />
        </div>
        <p class="title-produto text-center">
            <b>\${nome}</b>
        </p>
        <p class="price-produto text-center">
            <b>R$ \${preco}</b>
        </p>
        <div class="add-carrinho">
            <span class="btn-menos"><i class="fas fa-minus"></i></span>
            <span class="add-numeros-itens">0</span>
            <span class="btn-mais"><i class="fa fa-plus"></i></span>
            <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
        </div>
    </div>
</div>`
}