/**
 * Represents the environment where rock is running.
 *
 * @author Luis Alberto Jiménez
 */
rock.environment = {

    /**
     * User agent text (from navigator)
     */
    userAgent: navigator.userAgent,

    /**
     * User agent family
     */
    userAgentFamily: null,

    updateUserAgentFamily: function() {
        var userAgent = this.userAgent;
        if (rock.stringContains(userAgent, rock.constants.USER_AGENT_NAVIGATOR_TEXT_CHROME)) {
            this.userAgentFamily = rock.constants.USER_AGENT_FAMILY_CHROME;
        } else if (rock.stringContains(userAgent, rock.constants.USER_AGENT_NAVIGATOR_TEXT_FIREFOX)) {
            this.userAgentFamily = rock.constants.USER_AGENT_FAMILY_FIREFOX;
        } else if (rock.stringContains(userAgent, rock.constants.USER_AGENT_NAVIGATOR_TEXT_INTERNET_EXPLORER)) {
            this.userAgentFamily = rock.constants.USER_AGENT_FAMILY_INTERNET_EXPLORER;
        } else if (rock.stringContains(userAgent, rock.constants.USER_AGENT_NAVIGATOR_TEXT_INTERNET_EXPLORER_TRIDENT)) {
            // IE 11 (Revise it...)
            this.userAgentFamily = rock.constants.USER_AGENT_FAMILY_INTERNET_EXPLORER;
        }
    }
};

rock.environment.updateUserAgentFamily();