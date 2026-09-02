import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService
  ) {
    super({
      // Extract JWT from 'Authorization: Bearer <token>' header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Safely fetch secret key dynamically on each request
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        const secret = this.configService.get<string>('SECRET_KEY');
        done(null, secret);
      },
    });
  }

  // Runs automatically after token is verified. Returns data attached to 'req.user'
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid Token');
    }
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role
    };
  }
}