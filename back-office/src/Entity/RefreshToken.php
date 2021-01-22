<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RefreshToken
 *
 * @ORM\Table(name="refresh_token", indexes={@ORM\Index(name="IDX_C74F2195D6C9F383", columns={""userId""})})
 * @ORM\Entity
 */
class RefreshToken
{
    /**
     * @var string
     *
     * @ORM\Column(name="token", type="text", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="refresh_token_token_seq", allocationSize=1, initialValue=1)
     */
    private $token;

    /**
     * @var string|null
     *
     * @ORM\Column(name="userId", type="guid", nullable=true)
     */
    private $userid;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expirationDate", type="datetimetz", nullable=false)
     */
    private $expirationdate;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""userId"", referencedColumnName="id")
     * })
     */
    private $"userid";


}
