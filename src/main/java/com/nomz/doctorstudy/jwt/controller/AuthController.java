package com.nomz.doctorstudy.jwt.controller;

import com.ssafy.api.email.service.EmailService;
import com.ssafy.api.jwt.request.UserLoginPostReq;
import com.ssafy.api.jwt.response.UserLoginPostRes;
import com.ssafy.api.jwt.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.redis.RedisUtil;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
public class AuthController {
	@Autowired
	UserService userService;
	
	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	@Autowired
	private RedisUtil redisUtil;

	@Autowired
	private EmailService emailService;

	@Value("${jwt.refresh-token-expiration}")
	private Integer refreshTokenExpiration;
	
	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
        @ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
        @ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
        @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
	public ResponseEntity<UserLoginPostRes> login(@RequestBody @ApiParam(value="로그인 정보", required = true) UserLoginPostReq loginInfo, HttpServletResponse response) {
//		String userId = loginInfo.getId();
		String userId = loginInfo.getUser_id();
		String password = loginInfo.getPassword();


		User user = userService.getUserByUserId(userId);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if(passwordEncoder.matches(password, user.getPassword())) {
			Map<String, String> tokens = new HashMap<>();
			tokens.put("accessToken", JwtTokenUtil.getAccessToken(userId));
			tokens.put("refreshToken", JwtTokenUtil.getRefreshToken(userId));

			log.info("accessToken = {}", tokens.get("accessToken"));
			log.info("refreshToken = {}", tokens.get("refreshToken"));

			//지금은 레디스에 key값으로 userId를 넣었지만 추후 UUID로 key값을 잡을 예정
//			ValueOperations<String, String> vop = redisTemplate.opsForValue();
//			vop.set(userId, JwtTokenUtil.TOKEN_PREFIX + tokens.get("refreshToken"));
//			//레디스 인증 시간 설정
//			redisTemplate.expire(userId, new Duration(refreshTokenExpiration));

			//위에꺼 한번에 합침
//			setValueWithTTL(userId, JwtTokenUtil.TOKEN_PREFIX + tokens.get("refreshToken"), Duration.ofMillis(refreshTokenExpiration));
			redisUtil.setValueWithTTL(userId, JwtTokenUtil.TOKEN_PREFIX + tokens.get("refreshToken"), Duration.ofMillis(refreshTokenExpiration));

			//cookie에 값 세팅
//			Cookie cookie = new Cookie();




			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			return ResponseEntity.ok(UserLoginPostRes.of(200, "Success", tokens));
		}
		// 유효하지 않는 패스워드인 경우, 로그인 실패로 응답.
		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	@PostMapping("/refreshToken")
	public ResponseEntity<String> getAccessToken(@RequestBody Map<String, String> map, HttpServletRequest request){
		String user_id = map.get("user_id");
		String refreshToken = request.getHeader(JwtTokenUtil.HEADER_STRING);

		log.info("client header refreshToken = {}", refreshToken);

		//리프레시 토큰 깟는데 유효기간이 만료됐으면 login하라고 Exception 터트리기
		//1. 여기서 서버 redis에서 (key, value) -> (user_id, refreshToken) 비교해서 맞는지 체크
		//2. 그리고 유효기간 되는지 체크

		//client refresh == redis refresh
		//클라이언트가 request한 refresh token 값이랑 서버 redis에 저장된 값이랑 비교
		log.info("client refreshToken == server refreshToken {}", JwtTokenUtil.correctRefreshToken(user_id, refreshToken));
		if(!JwtTokenUtil.correctRefreshToken(user_id, refreshToken)){
			return ResponseEntity.status(401).body("다시 로그인 해주세요");
		}
		String accessToken = JwtTokenUtil.getAccessToken(user_id);
		log.info("new accessToken = {}", accessToken);

		return ResponseEntity.status(200).body(accessToken);
	}


	//로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout(Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		log.info("userDetails = {}", userDetails);
		String userId =  userDetails.getUsername();

		//레디스에 저장된 refreshToken 삭제
		redisTemplate.delete(userId);

		return ResponseEntity.status(200).body("로그아웃 성공");
	}






//	private void setValueWithTTL(String key, String value, Duration ttl) {
//		ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
//		valueOps.set(key, value);
//		redisTemplate.expire(key, ttl);
//	}
}
