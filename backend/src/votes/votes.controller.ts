import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {VotesService} from './votes.service';
import {JwtAuthGuard} from "../common/guards/jwt-auth.guard";
import {CurrentUser} from "../common/decorators/current-user.decorator";
import {User} from "../users/entities/user.entity";

@Controller('votes')
export class VotesController {
    constructor(private votesService: VotesService) {
    }

    @Post('tournament/start')
    @UseGuards(JwtAuthGuard)
    async startTournament(@CurrentUser() user: User) {
        return this.votesService.startNewTournamentSession(user.id);
    }

    @Get('tournament/current-pair')
    @UseGuards(JwtAuthGuard)
    async getCurrentTournamentPair(@CurrentUser() user: User) {
        return this.votesService.getCurrentTournamentPair(user.id);
    }

    @Post('tournament/vote/:catId')
    @UseGuards(JwtAuthGuard)
    async voteInTournament(@Param('catId') catId: string, @CurrentUser() user: User) {
        return this.votesService.voteInTournament(catId, user.id);
    }

    @Get('tournament/stats')
    async getTournamentStats(@CurrentUser() user: User) {
        return this.votesService.getTournamentStats(user.id);
    }

    @Post('tournament/end')
    @UseGuards(JwtAuthGuard)
    async endTournament(@CurrentUser() user: User) {
        return this.votesService.endTournamentSession(user.id);
    }

    @Get('history')
    @UseGuards(JwtAuthGuard)
    async getMyHistory(@CurrentUser() user: User) {
        return this.votesService.getUserVotes(user.id);
    }
}