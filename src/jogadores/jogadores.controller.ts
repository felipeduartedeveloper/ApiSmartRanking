import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { Get } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Delete } from '@nestjs/common';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}
  @Post()
  async criarAtualizarJogador(@Body() criarJogadorDto: CriarJogadorDto) {
    const { email } = criarJogadorDto;
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }
  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<Jogador[] | Jogador> {
    if (email) {
      return await this.jogadoresService.consultarTodosJogadorPeloEmail(email);
    } else {
      return await this.jogadoresService.consultarTodosJogadores();
    }
  }
  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    this.jogadoresService.deletarJogador(email);
  }
}
