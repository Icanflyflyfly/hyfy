/**
 *功能说明：系统公告
 * @author jacobliang
 * @time @Jul 26, 2017 @5:09:33 PM
 */
package com.bhtec.service.iface.platform.affiche;

import java.util.List;
import java.util.Map;

import com.bhtec.domain.pojo.platform.SysplAffiche;
import com.bhtec.exception.ApplicationException;
import com.bhtec.service.iface.BaseService;

public interface AfficheService extends BaseService {
	/**
	 * 功能说明：保存公告
	 * @author jacobliang
	 * @param sysplAffiche	公告公告
	 * @throws ApplicationException
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public void saveAffiche(SysplAffiche sysplAffiche) throws ApplicationException;
	/**
	 * 功能说明：删除某个公告
	 * @author jacobliang
	 * @param	afficheId 	公告列表ID
	 * @return
	 * @throws 
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public void deleteAfficheByIds(List<Long> afficheIdList)throws ApplicationException;
	/**
	 * 功能说明：根据公告ID查询某个公告
	 * @author jacobliang
	 * @param AfficheId
	 * @return
	 * @throws 
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public SysplAffiche findAfficheByAfficheId(Long afficheId);
	/**
	 * 功能说明：修改公告
	 * @author jacobliang
	 * @param sysplAffiche	公告对象
	 * @return
	 * @throws 
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public void modifyAffiche(SysplAffiche sysplAffiche)throws ApplicationException;
	/**
	 * 功能说明：查询公告名称是否重复
	 * @author jacobliang
	 * @param	start	开始记录数
	 * @param	limit	每页显示条数
	 * @param	afficheTitle 公告标题
	 * @param	affichePulish 公告是否发布
	 * @return Map 1 list 2 总数
	 * @throws 
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public Map findAfficheByCon(int start,int limit,String afficheTitle,Short affichePulish);
	/**
	 * 功能说明：查询所有有效期之前公告信息
	 * @author jacobliang
	 * @return List<SysplAffiche>	所有公告信息
	 * @time Dec 1, 2017 2:51:21 PM
	 */
	public List<SysplAffiche> findAllAfficheBeforeValidate();
}
