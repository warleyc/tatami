package fr.ippon.tatami.web.controller;

import fr.ippon.tatami.domain.Domain;
import fr.ippon.tatami.service.AdminService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import java.util.Collection;

/**
 * @author Julien Dubois
 */
@Controller
public class AdminController {

    private final Log log = LogFactory.getLog(AdminController.class);

    @Inject
    private AdminService adminService;

    @RequestMapping(value = "/admin",
            method = RequestMethod.GET)
    public ModelAndView adminPage() {
        Collection<Domain> domains = adminService.getAllDomains();
        ModelAndView mv = new ModelAndView("admin");
        mv.addObject("domains", domains);
        return mv;
    }
}
