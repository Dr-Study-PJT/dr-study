package com.nomz.doctorstudy.common.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.*;
import com.auth0.jwt.exceptions.InvalidClaimException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

/**
 * jwt 토큰 유틸 정의.
 */
@Component
@Slf4j
public class JwtUtil {
    private String secretKey;
    private Integer accessExpirationTime;
    private Integer refreshExpirationTime;
    private RedisTemplate<String, String> redisTemplate;

    public final String TOKEN_PREFIX = "Bearer ";
    public final String HEADER_STRING = "Authorization";
    public final String ISSUER = "ssafy.com";

    private final Key key;

    @Autowired
	public JwtUtil(
            @Value("${jwt.secret}") String secretKey,
            @Value("${jwt.access-token-expiration}") Integer accessTokenExpiration,
            @Value("${jwt.refresh-token-expiration}") Integer refreshTokenExpiration,
            RedisTemplate<String, String> redisTemplate
            )
    {
		this.secretKey = secretKey;
        this.accessExpirationTime = accessTokenExpiration;
        this.refreshExpirationTime = refreshTokenExpiration;
        this.redisTemplate = redisTemplate;

        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
	}

//	public void setExpirationTime() {
//    		//JwtTokenUtil.expirationTime = Integer.parseInt(expirationTime);
//    		JwtTokenUtil.expirationTime = expirationTime;
//	}

	public JWTVerifier getVerifier() {
        return JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();
    }

    public String getToken(Integer expirationTime, String userId) {
//        Date expires = getTokenExpiration(expirationTime);

//        return JWT.create()
//                .withSubject(userId)
//                .withExpiresAt(expires)
//                .withIssuer(ISSUER)
//                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
//                .sign(Algorithm.HMAC512(secretKey.getBytes()));


        Claims claims = Jwts.claims();

        claims.put("email", userId);
//        claims.put("email", member.getUserId());
//        claims.put("role", member.getRole());

        ZonedDateTime now = ZonedDateTime.now();
//        ZonedDateTime tokenValidity = now.plusSeconds(expirationTime);
//        Date expires = JwtUtil.getTokenExpiration(expirationTime);
        Date expires = getTokenExpiration(expirationTime);



        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(Date.from(now.toInstant()))
                .setExpiration(expires)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();


    }

    public String getRefreshToken(String userId){
        return getToken(refreshExpirationTime, userId);
    }

    public String getAccessToken(String userId){
        return getToken(accessExpirationTime, userId);
    }

//    public static String getToken(Instant expires, String userId) {
//        return JWT.create()
//                .withSubject(userId)
//                .withExpiresAt(Date.from(expires))
//                .withIssuer(ISSUER)
//                .withIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
//                .sign(Algorithm.HMAC512(secretKey.getBytes()));
//    }

    public Date getTokenExpiration(int expirationTime) {
    		Date now = new Date();
    		return new Date(now.getTime() + expirationTime);
    }

    public void handleError(String token) {
        JWTVerifier verifier = JWT
                .require(Algorithm.HMAC512(secretKey.getBytes()))
                .withIssuer(ISSUER)
                .build();

        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            //access Token이 만료됨
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }

    public void handleError(JWTVerifier verifier, String token) {
        try {
            verifier.verify(token.replace(TOKEN_PREFIX, ""));
        } catch (AlgorithmMismatchException ex) {
            throw ex;
        } catch (InvalidClaimException ex) {
            throw ex;
        } catch (SignatureGenerationException ex) {
            throw ex;
        } catch (SignatureVerificationException ex) {
            throw ex;
        } catch (TokenExpiredException ex) {
            throw ex;
        } catch (JWTCreationException ex) {
            throw ex;
        } catch (JWTDecodeException ex) {
            throw ex;
        } catch (JWTVerificationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw ex;
        }
    }


    public boolean correctRefreshToken(String userId, String clientRefreshToken) {
        //redis에서 값 꺼내서 사용 ( pk대신 UUID같은거 쓰자 )
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        // userId를 파라미터로 넘겨서 비교하기
        //
        String serverRefreshToken = vop.get(userId);
        log.info("server refreshToken = {}", serverRefreshToken);

        return clientRefreshToken.equals(serverRefreshToken);
    }







//    /**
//     * Access Token 생성
//     * @param member
//     * @return Access Token String
//     */
//    public String createAccessToken(Member member) {
//        return createToken(member, accessExpirationTime);
//    }
//
//
//
//    /**
//     * JWT 생성
//     * @param member
//     * @param expireTime
//     * @return JWT String
//     */
//    private String createToken(Member member, long expireTime) {
//        Claims claims = Jwts.claims();
//
//        claims.put("memberId", member.getId());
//        claims.put("email", member.getUserId());
////        claims.put("role", member.getRole());
//
//        ZonedDateTime now = ZonedDateTime.now();
//        ZonedDateTime tokenValidity = now.plusSeconds(expireTime);
//
//
//        return Jwts.builder()
//                .setClaims(claims)
//                .setIssuedAt(Date.from(now.toInstant()))
//                .setExpiration(Date.from(tokenValidity.toInstant()))
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
//    }


    /**
     * Token에서 User ID 추출
     * @param token
     * @return User ID
     */
    public String getUserId(String token) {
        return parseClaims(token).get("email", String.class);
    }


    /**
     * JWT 검증
     * @param token
     * @return IsValidate
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("Invalid JWT Token", e);
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT Token", e);
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT Token", e);
        } catch (IllegalArgumentException e) {
            log.info("JWT claims string is empty.", e);
        }
        return false;
    }


    /**
     * JWT Claims 추출
     * @param accessToken
     * @return JWT Claims
     */
    public Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }

}
