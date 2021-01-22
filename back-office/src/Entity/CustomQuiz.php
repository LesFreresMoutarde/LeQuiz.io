<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CustomQuiz
 *
 * @ORM\Table(name="custom_quiz", indexes={@ORM\Index(name="custom_quiz_title", columns={"title"}), @ORM\Index(name="custom_quiz_author_id", columns={"authorId"}), @ORM\Index(name="custom_quiz_reviews_requested", columns={"reviewsRequested"}), @ORM\Index(name="custom_quiz_status", columns={"status"})})
 * @ORM\Entity
 */
class CustomQuiz
{
    /**
     * @var string
     *
     * @ORM\Column(name="id", type="guid", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="SEQUENCE")
     * @ORM\SequenceGenerator(sequenceName="custom_quiz_id_seq", allocationSize=1, initialValue=1)
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=false)
     */
    private $title;

    /**
     * @var string|null
     *
     * @ORM\Column(name="authorId", type="guid", nullable=true)
     */
    private $authorid;

    /**
     * @var bool
     *
     * @ORM\Column(name="reviewsRequested", type="boolean", nullable=false)
     */
    private $reviewsrequested;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=30, nullable=false)
     */
    private $status;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetimetz", nullable=false)
     */
    private $createdat;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="updatedAt", type="datetimetz", nullable=false)
     */
    private $updatedat;

    /**
     * @var \User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name=""authorId"", referencedColumnName="id")
     * })
     */
    private $"authorid";


}
