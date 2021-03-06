/**
 *功能说明：
 * @author jacobliang
 * @time @Nov 17, 2017 @9:16:00 AM
 */
package com.bhtec.service.iface.uum;

import java.util.List;
import java.util.Map;

import com.bhtec.domain.pojo.uum.UumRoleUserRef;
import com.bhtec.domain.pojo.uum.UumUser;
import com.bhtec.domain.pojo.uum.UumUserAgent;
import com.bhtec.domain.pojo.uum.UumUserCommfun;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.BaseService;

public interface UumCommonService extends BaseService {
	/**
	 * 功能说明：根据用户ID查找用户的所有角色 
	 * 源自：RoleUserService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userId	用户主键ID
	 * @return	用户角色关系记录
	 * @time Oct 9, 2017 3:52:47 PM
	 */
	public List<UumRoleUserRef> findRoleUserListByUserId(long userId);
	/**
	 * 功能说明：根据用户code和密码获得用户信息
	 * 源自：UserService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userCode	用户登录名
	 * @param password	用户密码
	 * @return	UumUser	用户对象
	 * @time Nov 3, 2017 2:20:11 PM
	 */
	public UumUser findUserByUserCodeAPwd(String userCode,String password) throws ApplicationException;
	/**
	 * 功能说明：查询判断用户是否有特殊操作权限
	 * 源自：PrivilegeService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param userId		用户或角色ID
	 * @return true 有 false 无
	 * @time Nov 3, 2017 8:16:42 PM
	 */
	public boolean findUserHasSpecialPrivilege(long userId);
	/**
	 * 功能说明：根据登录的用户或角色ID 和 标识查询所有模块操作
	 * 源自：PrivilegeService 应用：LoginServiceImpl
	 * @author jacobliang
	 * @param ownerId			用户或角色ID
	 * @param ownerType		    为用户或角色标识
	 * @return modMenuMap:1-list;2-map;3-map;4-map
	 * @time Nov 1, 2017 11:29:03 AM
	 */
	public Map findUserPrivilegeForLogin(long userId,long roleId,long organId,long organRoleId);
	/**
	 * 功能说明：查询代理用户的权限
	 * @author jacobliang
	 * @param userId
	 * @param roleId
	 * @param organId
	 * @param organRoleId
	 * @param privilegeIdList
	 * @return
	 * @time Feb 24, 2012 11:39:43 AM
	 */
	public Map findUserPrivilegeForAgentLogin(long userId,long roleId,long organId,
											  long organRoleId,List privilegeIdList);
	/**
	 * 功能说明：根据用户ID查询用户常用功能
	 * @author jacobliang
	 * @param userId	用户ID
	 * @return
	 * @time Nov 26, 2017 11:00:32 AM
	 */
	public List<UumUserCommfun> findUserCommFunByUserId(long userId);
	/**
	 * 功能说明：删除用户无用常用功能
	 * @author jacobliang
	 * @param 	uumUserCommfunList		 用户常用功能列表
	 * @throws ApplicationException
	 * @time Nov 26, 2017 10:57:57 AM
	 */
	public void deleteUserCommFunById(List<UumUserCommfun> uumUserCommfunList)throws ApplicationException;
	/**
	 * 功能说明：删除模块操作关系时同时也删除模块操作权限
	 * @author jacobliang
	 * @param modOptRefId
	 * @time Feb 8, 2012 1:09:22 PM
	 */
	public void deletePrivilegeByModOptId(String modOptRefId);
	/**
	 * 功能说明：根据用户ID查询代理记录
	 * @author jacobliang
	 * @param userId
	 * @return
	 * @time Feb 23, 2012 9:39:56 AM
	 */
	public List<UumUserAgent> findUumUserAgentByAgentUserId(long userId);
	/**
	 * 功能说明：根据代理ID查询代理的权限
	 * @author jacobliang
	 * @param agentId
	 * @return
	 * @time Feb 24, 2012 10:14:46 AM
	 */
	public List findAgentPrivilegeByAgentId(String agentId);
}
